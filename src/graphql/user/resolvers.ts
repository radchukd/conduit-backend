import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import isBase64 from 'validator/lib/isBase64';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import {
  db,
  JWT_SECRET,
  JWT_EXPIRY,
} from '../../config';
import {
  Context,
  UserType,
  ProfileType,
  UserDocument,
  QueryLoginArgs,
  NewUserDocument,
  QueryProfileArgs,
  MutationSignupArgs,
  MutationUpdateUserArgs,
  MutationFollowUserArgs,
  MutationUnfollowUserArgs,
} from '../../types';
import { UD2PT, UD2UT } from '../../util';

const usersResolvers = {
  login: async (
    args: QueryLoginArgs,
    context: Context,
  ): Promise<UserType> => {
    if (context.payload) { throw new Error('User is logged in.'); }
    const { input } = args;
    const email = input.email.trim();
    const password = input.password.trim();
    if (!isEmail(email)) { throw new Error('Invalid email.'); }
    const user: UserDocument = await db.users.findOne({ email });
    if (!user) { throw new Error('User not found.'); }
    const match: boolean = await compare(password, user.password);
    if (!match) { throw new Error('Incorrect password.'); }
    const token: string = sign({ _id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
    return UD2UT(user, token);
  },
  user: async (
    _args: {},
    context: Context,
  ): Promise<UserType> => {
    if (!context.payload) { throw new Error('User is not logged in'); }
    const { token, payload: { _id } } = context;
    const user: UserDocument = await db.users.findOne({ _id: new ObjectId(_id) });
    if (!user) { throw new Error('User not found.'); }
    return UD2UT(user, token);
  },
  profile: async (
    args: QueryProfileArgs,
    context: Context,
  ): Promise<ProfileType> => {
    const _id = context.payload ? context.payload._id : null;
    const { username } = args;
    const user: UserDocument = await db.users.findOne({ username });
    if (!user) { throw new Error('User not found.'); }
    return UD2PT(user, _id);
  },
  signup: async (
    args: MutationSignupArgs,
    context: Context,
  ): Promise<UserType> => {
    if (context.payload) { throw new Error('User is logged in.'); }
    const { input } = args;
    const email = input.email.trim();
    const username = input.username.trim();
    const password = input.password.trim();
    if (!isEmail(email)
     || !isLength(username, { min: 3, max: 64 })
     || !isLength(password, { min: 3, max: 64 })) {
      throw new Error('Invalid input.');
    }
    const filter = { $or: [{ email }, { username }] };
    const users: UserDocument[] = await db.users.find(filter).toArray();
    if (users.length > 0) { throw new Error('Email/username is already registered.'); }
    const newUser: NewUserDocument = {
      email,
      username,
      password: await hash(password, 12),
      bio: '',
      image: '',
      followers: [],
      following: [],
      favorited: [],
      createdAt: (new Date()).valueOf(),
      updatedAt: (new Date()).valueOf(),
    };
    const { insertedId } = await db.users.insertOne(newUser);
    const user: UserDocument = await db.users.findOne({ _id: new ObjectId(insertedId) });
    const token: string = sign({ _id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
    return UD2UT(user, token);
  },
  updateUser: async (
    args: MutationUpdateUserArgs,
    context: Context,
  ): Promise<UserType> => {
    if (!context.payload) { throw new Error('User is not logged in.'); }
    const { token, payload: { _id } } = context;
    const { input } = args;
    if (Object.keys(input).length === 0) { throw new Error('No input provided.'); }
    const email = input.email && input.email.trim();
    const username = input.username && input.username.trim();
    const password = input.password && input.password.trim();
    const bio = input.bio && input.bio.trim();
    const image = input.image && input.image.trim();
    const user: UserDocument = await db.users.findOne({ _id: new ObjectId(_id) });
    if (!user) { throw new Error('User not found.'); }
    if (email && email !== user.email) {
      if (!isEmail(email)) { throw new Error('Invalid email.'); }
      const existingEmail: UserDocument = await db.users.findOne({ email });
      if (existingEmail) { throw new Error('Email is already registered.'); }
      user.email = email;
    }
    if (username && username !== user.username) {
      if (!isLength(username, { min: 3, max: 64 })) { throw new Error('Invalid username.'); }
      user.username = username;
      const existingUsername: UserDocument = await db.users.findOne({ username });
      if (existingUsername) { throw new Error('Username is already registered.'); }
    }
    if (password) {
      if (!isLength(username, { min: 3, max: 64 })) { throw new Error('Invalid password.'); }
      user.password = await hash(password, 12);
    }
    if (bio && bio !== user.bio) {
      if (!isLength(bio, { min: 3, max: 280 })) { throw new Error('Invalid bio.'); }
      user.bio = bio;
    }
    if (image && image !== user.image) {
      if (!isBase64(image)) { throw new Error('Invalid image'); }
      user.image = image;
    }
    user.updatedAt = (new Date()).valueOf();
    await db.users.findOneAndReplace({ _id: user._id }, user);
    return UD2UT(user, token);
  },
  followUser: async (
    args: MutationFollowUserArgs,
    context: Context,
  ): Promise<ProfileType> => {
    if (!context.payload) { throw new Error('User is not logged in.'); }
    const { payload: { _id } } = context;
    const { username } = args;
    const user: UserDocument = await db.users.findOne({ username });
    if (!user) { throw new Error('User not found.'); }
    if (user._id.equals(_id)) { throw new Error('Cannot follow self.'); }
    if (user.followers.includes(_id)) { throw new Error('User is already followed.'); }
    user.followers.push(_id);
    await db.users.findOneAndReplace({ _id: user._id }, user);
    const self: UserDocument = await db.users.findOne({ _id: new ObjectId(_id) });
    self.following.push(user._id.toHexString());
    await db.users.findOneAndReplace({ _id: self._id }, self);
    return UD2PT(user, _id);
  },
  unfollowUser: async (
    args: MutationUnfollowUserArgs,
    context: Context,
  ): Promise<ProfileType> => {
    if (!context.payload) { throw new Error('User is not logged in'); }
    const { payload: { _id } } = context;
    const { username } = args;
    const user: UserDocument = await db.users.findOne({ username });
    if (!user) { throw new Error('User not found.'); }
    if (user._id.equals(_id)) { throw new Error('Cannot unfollow self.'); }
    if (!user.followers.includes(_id)) { throw new Error('User is not followed.'); }
    user.followers.splice(user.followers.indexOf(_id, 1), 1);
    await db.users.findOneAndReplace({ _id: user._id }, user);
    const self: UserDocument = await db.users.findOne({ _id: new ObjectId(_id) });
    self.following.splice(self.following.indexOf(user._id.toHexString()), 1);
    await db.users.findOneAndReplace({ _id: self._id }, self);
    return UD2PT(user, _id);
  },
};

export default usersResolvers;

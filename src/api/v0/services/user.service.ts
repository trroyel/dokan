import { User } from '../daos/models';
import { deleteFile, Conflict } from '../utilities';
import {
    IUser, UserDoc, LeanUser, UpdateUser,
    IService, QueryFilter, Projection, QueryOptions
} from '../interfaces';

class UserService implements IService<IUser>{
    public async findAll(
        filter: QueryFilter = {},
        props?: Projection,
        options?: QueryOptions): Promise<LeanUser[]> {

        return await User.find(filter, props, options).lean().exec();
    }

    public async countDocuments(filter: QueryFilter = {}): Promise<number> {
        return await User.countDocuments(filter).exec()
    }

    public async findById(id: string, projection?: Projection): Promise<LeanUser | null> {
        return await User.findById(id, projection).lean().exec();
    }

    public async create(data: IUser): Promise<UserDoc> {
        data.email = data.email.toLowerCase();

        if (await User.isEmailTaken(data.email)) {
            if (data.image) await deleteFile(data.image);

            throw new Conflict(`user email:${data.email}`);
        }
        return await new User(data).save();
    }

    public async updateById(id: string, data: UpdateUser): Promise<UserDoc | null> {
        const user = await User.findById(id);

        if (!user) {
            if (data.image) await deleteFile(data.image);
            return null;
        }
        if (Object.keys(data).length == 0) return null;
        const oldImage = user.image;

        Object.assign(user, data);
        const updatedUser = await user.save();

        if (oldImage && data.image) await deleteFile(oldImage);

        return updatedUser;;
    }

    public async deleteById(id: string): Promise<LeanUser | null> {
        const deletedUser = await User
            .findByIdAndDelete(id).lean().exec();

        if (deletedUser && deletedUser.image)
            await deleteFile(deletedUser.image);

        return deletedUser;
    }

    public async findOne(filter: QueryFilter, props?: Projection): Promise<LeanUser | null> {
        return await User.findOne(filter, props).lean().exec();
    }
}

export default new UserService();
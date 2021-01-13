import { v4 as uuid } from 'uuid';

import UserToken from '../../infra/typeorm/entities/UserToken';
import IUsersTokensRepository from '@modules/users/repositories/IUsersTokensRepository';

class FakeUsersTokensRepository implements IUsersTokensRepository {

    private userTokens: UserToken[] = [];

    public async generate(user_id: string): Promise<UserToken> {

        const userToken = new UserToken();

        Object.assign(userToken, {

            id: uuid(),
            token: uuid(),
            user_id,

        });

        this.userTokens.push(userToken);

        return userToken;

    }

    public async findByToken(token: string): Promise<UserToken | undefined> {

        const userToken = this.userTokens.find(findToken => findToken.token === token);

        return userToken;

    }

}

export default FakeUsersTokensRepository;

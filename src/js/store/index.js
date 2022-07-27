import createFavoriteStore from "./favorite"
import createUserStore from './user';

export default ({ $sl })=>{
    return {
        favorite: createFavoriteStore(),
        user: createUserStore({ userService: $sl.userService }),
    }
}

import favorite from "./favorite"
import createUserStore from './user';

export default ({ $di })=>{
 
    const user = createUserStore({ 
        userService: $di.userService
    }); 
    return {
        favorite,
        user,
    }
}

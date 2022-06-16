import { AccessControl } from 'accesscontrol';

let grantsObject = {
    admin:{
        shows:{
            'create:any':['*'],
            'read:any':['*'],
            'update:any':['*'],
            'delete:any':['*'],
        }
    },
    user:{
        shows:{
            'read:any':['*']
        }
    }
}

const roles = new AccessControl(grantsObject)
export default roles;
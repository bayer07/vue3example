import {
    defineStore
} from 'pinia'
import {
    reactive
} from 'vue'
import IUserAccount from '@/interface/IUserAccount'

const STORE_NAME = 'main'

const generateId = () => {
    const lastId: string = localStorage.getItem('lastUserId') || '0';
    const newId: number = parseInt(lastId) + 1;
    localStorage.setItem('lastUserId', newId.toString());
    return newId;
};

const loadUsers = () => {
    const item: string | null = localStorage.getItem(STORE_NAME);
    const users: IUserAccount[] = item ? JSON.parse(item) : [];
    return users;
}

const saveStore = (users: IUserAccount[]) => {
    let json = JSON.stringify(users);
    localStorage.setItem(STORE_NAME, json);
}
export const useUserStore = defineStore(STORE_NAME, {
    state: () => ({
        users: reactive(loadUsers()),
    }),
    getters: {
        userId: () => {
            return generateId();
        }
    },
    actions: {
        addUser(user: IUserAccount) {
            this.users.push(user);
            saveStore(this.users);
            console.log('user added', user);
        },
        updateUser(user: IUserAccount, index: number) {
            this.users[index] = user;
            saveStore(this.users);
            console.log('user updated', index);
        },
        deleteUser(index: number) {
            if (index >= 0 && index < this.users.length) {
                this.users.splice(index, 1);
                saveStore(this.users);
                console.log('user deleted', index);
            } else {
                console.error('User not found at index:', index);
            }
        }
    },
})
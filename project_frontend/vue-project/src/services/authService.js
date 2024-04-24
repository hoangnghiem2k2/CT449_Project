import axios from '@/services/axiosService';

export const registerUser = async (userData) => {
    try {
        const response = await axios.post('/user/sign-up', userData);
        return response.data;
    } catch (error) {
        throw new Error('Đã xảy ra lỗi khi đăng ký:', error);
    }
};



export const loginUser = async (userData) => {
    try {
        const response = await axios.post('/user/sign-in', userData);
        const { user } = response.data;
        
     
        const { token } = response.data;
        localStorage.setItem('token', token);
        
        return user; 
    } catch (error) {
        throw new Error('Đã xảy ra lỗi khi đăng nhập:', error);
    }
};




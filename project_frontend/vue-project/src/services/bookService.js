import axios from '@/services/axiosService'; 

export const getAllBooks = async () => {
    try {
        const response = await axios.get('/book');
        return response.data;
    } catch (error) {
        throw new Error('Đã xảy ra lỗi khi fetch sách:', error);
    }
};

export const getBookById = async (id) => {
    try {
        const response = await axios.get(`/book/get-details/${id}`); 
        return response.data;
    } catch (error) {
        throw new Error('Đã xảy ra lỗi khi fetch sách:', error);
    }
};

export const getRemainQuantity = async (id) => {
    try {
        const response = await axios.get(`/themuonsach/count/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Đã xảy ra lỗi khi fetch sách:', error);
    }
};

export const deleteBook = async (id, token, ) => {
    try {
        const response = await axios.delete(`/book/delete-book/${id}`, {
            headers: {
                token: `Bearer ${token}` 
            }
        }); 
        return response.data;
    } catch (error) {
        throw new Error('Đã xảy ra lỗi khi fetch data:', error);
    }
};

export const editBook = async (data, id, token, ) => {
    try {
        const response = await axios.put(`/book/update-book/${id}`, data, {
            headers: {
                token: `Bearer ${token}` 
            }
        }); 
        return response.data;
    } catch (error) {
        throw new Error('Đã xảy ra lỗi khi fetch data:', error);
    }
};

export const addBook = async (data, token, ) => {
    try {
        const response = await axios.post(`/book/add-newbook`, data, {
            headers: {
                token: `Bearer ${token}` 
            }
        }); 
        return response.data;
    } catch (error) {
        throw new Error('Đã xảy ra lỗi khi fetch data:', error);
    }
};


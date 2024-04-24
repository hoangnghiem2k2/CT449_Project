import axios from '@/services/axiosService'; // Import service bạn đã tạo

export const getBorrowedBooks = async (id) => {
    try {
        const response = await axios.get(`/themuonsach/user/${id}`); 
        return response.data;
    } catch (error) {
        throw new Error('Đã xảy ra lỗi khi fetch sách:', error);
    }
};

export const borrowBook = async (data, token) => {
    try {
        const response = await axios.post(`/themuonsach/add-the`, data, {
            headers: {
                token: `Bearer ${token}` // Thêm token vào header Authorization
            }
        }); 
        return response.data;
    } catch (error) {
        throw new Error('Đã xảy ra lỗi khi fetch sách:', error);
    }
};

export const getAllBorrowedBooks = async () => {
    try {
        const response = await axios.get(`/themuonsach`); 
        return response.data;
    } catch (error) {
        throw new Error('Đã xảy ra lỗi khi fetch sách:', error);
    }
};

export const getUnreturnedBooks = async () => {
    try {
        const response = await axios.get(`/themuonsach/book-return`); 
        return response.data;
    } catch (error) {
        throw new Error('Đã xảy ra lỗi khi fetch sách:', error);
    }
};

export const getBorrowedBookById = async (id) => {
    try {
        const response = await axios.get(`/themuonsach/find/${id}`); 
        return response.data;
    } catch (error) {
        throw new Error('Đã xảy ra lỗi khi fetch sách:', error);
    }
};
export const editborrowedBook = async (data,id,token) => {
    try {
        const response = await axios.put(`/themuonsach/update/${id}`, data, {
            headers: {
                token: `Bearer ${token}` // Thêm token vào header Authorization
            }
        }); 
        return response.data;
    } catch (error) {
        throw new Error('Đã xảy ra lỗi khi fetch sách:', error);
    }
};

export const deleteborrowedBook = async (id,token) => {
    try {
        const response = await axios.delete(`/themuonsach/delete/${id}`, {
            headers: {
                token: `Bearer ${token}` // Thêm token vào header Authorization
            }
        }); 
        return response.data;
    } catch (error) {
        throw new Error('Đã xảy ra lỗi khi fetch sách:', error);
    }
};

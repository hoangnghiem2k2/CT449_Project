import axios from '@/services/axiosService'; 

export const getAllPublishers = async () => {
    try {
        const response = await axios.get('/NXB');
        return response.data;
    } catch (error) {
        throw new Error('Đã xảy ra lỗi khi fetch sách:', error);
    }
};

export const getPublisherById = async (id) => {
    try {
        const response = await axios.get(`/NXB/get-details/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Đã xảy ra lỗi khi fetch sách:', error);
    }
};

export const updatePublisherById = async (id,data, token) => {
    try {
        const response = await axios.put(`/NXB/update-NXB/${id}`,data, {
            headers: {
                token: `Bearer ${token}` // Thêm token vào header Authorization
            }
        }); 
        return response.data;
    } catch (error) {
        throw new Error('Đã xảy ra lỗi khi fetch sách:', error);
    }
};

export const deletePublisher = async (id,token) => {
    try {
        const response = await axios.delete(`/NXB/delete-NXB/${id}`, {
            headers: {
                token: `Bearer ${token}` 
            }
        }); 
        return response.data;
    } catch (error) {
        throw new Error('Đã xảy ra lỗi khi fetch sách:', error);
    }
};

export const addPublisher = async (data, token) => {
    try {
        const response = await axios.post(`/NXB/add-NXB`,data, {
            headers: {
                token: `Bearer ${token}` 
            }
        }); 
        return response.data;
    } catch (error) {
        throw new Error('Đã xảy ra lỗi khi fetch sách:', error);
    }
};

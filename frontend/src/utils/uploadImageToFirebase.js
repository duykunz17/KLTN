import storage from './firebaseStorage';
import Swal from 'sweetalert2';

const uploadImages = async (file, cbURL) => {
    let uploadTask = storage.ref(`images/${file.name}`).put(file);
    await uploadTask.on('state_changed',
        (snapshot) => {
            // progress function
            let process = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                Swal.fire({
                    title: 'Đang tải ảnh',
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    background: '#19191a',
                    showConfirmButton: false,
                    onOpen: () => {
                        Swal.showLoading();
                    },
                    timer: process,
                    timerProgressBar: true
                });
        },
        (error) => {
            console.log('Error: ' + error);
        },
        () => {
            // complete function
            storage.ref('images').child(file.name).getDownloadURL().then(url => {
                cbURL(url);
            });
        }
    );
}

export default uploadImages;
import storage from './firebaseStorage';
import Swal from 'sweetalert2';

const uploadImages = (files, cbURL) => {
    let arrFiles = [];
    files.forEach(el => {
        let uploadTask = storage.ref(`images/${el.name}`).put(el);
        uploadTask.on('state_changed',
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
                storage.ref('images').child(el.name).getDownloadURL().then(url => {
                    cbURL(arrFiles = [...arrFiles, url]);
                });
            }
        );
    })

}

export default uploadImages;
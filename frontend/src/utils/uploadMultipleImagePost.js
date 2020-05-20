import storage from './firebaseStorage';

const uploadImages = (files, cbURL) => {
    let arrFiles = [];
    files.forEach(el => {
        let uploadTask = storage.ref(`images/${el.name}`).put(el);
        uploadTask.on('state_changed',
            (snapshot) => {
                // progress function
                // const process = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            },
            (error) => {
                console.log('Error: ' + error);
            },
            () => {
                // complete function
                storage.ref('images').child(el.name).getDownloadURL().then(url => {
                    cbURL(arrFiles=[...arrFiles, url]);
                });
            }
        );
    })
    
}

export default uploadImages;
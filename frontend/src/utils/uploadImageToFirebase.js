import storage from './firebaseStorage';

const uploadImages = async (file, cbURL) => {
    let uploadTask = storage.ref(`images/${file.name}`).put(file);
    await uploadTask.on('state_changed',
        (snapshot) => {
            // progress function
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
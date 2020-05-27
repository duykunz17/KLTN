const users = [];

var addUser = ({id, name, room}) => {
    // name = name.trim().toLowerCase();
    // room = room.trim().toLowerCase();

    let existingUser = users.find((user) => user.room === room && user.name === name);

    if (existingUser)
        return {error: 'User is taken'};
    let user = {id, name, room}
    users.push(user);
    return {user};
}

var removeUser = (id) => {
    let index = users.findIndex((user) => user.id === id);

    if (index !== -1)
        return users.splice(index, 1)[0];
}

var getUser = (id) => {
    return users.find((user) => user.id === id);
}

var getUserByName = (name) => {
    return users.find((user) => user.name === name);
}

var getUserInPost = (room) => {
    return users.filter((user) => user.room === room);
}

module.exports = {
    addUser, removeUser, getUser, getUserInPost, getUserByName
}



module.exports = ({ id, owner }) => {
    return Object.freeze({
        id,
        owner,
        partners: [owner]
    })
}
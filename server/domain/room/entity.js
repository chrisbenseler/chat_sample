


module.exports = ({ owner }) => {
    return Object.freeze({
        owner,
        partners: [owner]
    })
}
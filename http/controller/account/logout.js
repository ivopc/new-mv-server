module.exports = async (req, res) => {
    // if auth token is diffent from input token
    if (req.body["token"] !== req.session["csrfToken"]) {
        res.status(401).json({ success: false });
        return;
    };
    // destroy session
    await new Promise(resolve => req.session.destroy(resolve));
    res.json({ success: true });
};
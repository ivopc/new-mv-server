const checkBlockPages = async () => {
    // const [ captcha, initialMonster ] = await Promise.all([
    //     checkCaptcha(),
    //     checkInitialMonster()
    // ]);

    const [ captcha, initialMonster ] = [1, 2];

    if (captcha)
        return 1;

    if (initialMonster)
        return 2;

    return false;
};

module.exports = { checkBlockPages };
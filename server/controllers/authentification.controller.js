export function login(req, res){
    const username = req.query.username;
    const password = req.query.password;
    if(!username || !password)
        return res.status(400).send('Missing username or password!');
    console.log('User trying to log in : '+username);
    res.json({username : username});
}

export function amILogged(req,res){
    //TODO
    res.status(200).end();
}
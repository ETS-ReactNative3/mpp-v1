const fetch = (...args) =>
  import('node-fetch').then(({
    default: fetch
  }) => fetch(...args));

const verifyAuthToken = async (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.status(401).json({ msg: "No token authorization denied " });
    }
  
    try {
    await fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`)
      .then((response) => {
       return response.json();
      })
      .then((json)=>{
        //console.log(json);
        if(json.email_verified === "true") {
          next();
        }
        else{
          return res.status(401).json({ msg: "NOT VALID" });
        }
      })
      .catch(error => {
        console.log(error);
         return res.status(401).json({ msg: "NOT VALID" });
      });

    } catch (err) {
      console.log(err);
      return res.status(401).json({ msg: "NOT VALID" });
    }
};



const getEmail = async (req, res, next) => {
  const id_token = req.header("x-auth-token");
  const email = await fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${id_token}`)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      //console.log(json);
      return json.email;
    })
    .catch(error => {
      console.log(error);
      return null;
    });
  return email;
}

const getEmailWithId = async (id_token) => {
  const email = await fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${id_token}`)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      //console.log(json);
      return json.email;
    })
    .catch(error => {
      console.log(error);
      return null;
    });
  return email;
}

module.exports = {
    verifyAuthToken,
    getEmail,
    getEmailWithId
}
function init(){
        return fetch("https://api.typeform.com/accounts/01GBS089NJ0V0HJVASYYYH989T/authorizations", {
    "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        "sec-ch-ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "cookie": "tf_respondent_cc={%22groups%22:[%222%22%2C%223%22%2C%224%22]%2C%22timestamp%22:%222023-09-11T07:24:54.276Z%22%2C%22implicitConsent%22:true}; attribution_user_id=fbef911f-c05f-4973-918b-85e765084a12; rl_page_init_referrer=RudderEncrypt%3AU2FsdGVkX18q8EN%2BSInBIndrJIPWqF8%2BuAQuxJGuek0%3D; rl_page_init_referring_domain=RudderEncrypt%3AU2FsdGVkX1%2BvFbr3wc175Lj7UoLj1yz%2BdVLG%2BQDK2AU%3D; experiments-fingerprint=ce37d192-58c7-4425-931d-81a93f65e4fc; OptanonAlertBoxClosed=2023-10-12T02:30:15.372Z; ajs_anonymous_id=dc7cd407-1200-4e7f-8582-954352f57b85; signup_provider=google; _tt_enable_cookie=1; _ttp=-fHzaCsVpCNQzwLf1w0B1nmLOky; tf_auth=4Xusy8hz2qfQFB98B8tDY8eQnkZvC6gJMMYoE8irM65J; tf_email=mandaviapooja19%40gmail.com; device_view=full; account_ids=[]; just_logged_in=; get_more_seats_banner=; ajs_user_id=21654051; tracking_session_id=e8819c45-2067-4672-b6be-64605f132efe; rl_user_id=RudderEncrypt%3AU2FsdGVkX1%2Bt7X04tKdfBQKooG%2FnzVF9UrRkmKWqSIw%3D; rl_anonymous_id=RudderEncrypt%3AU2FsdGVkX1%2B2BrIhL%2FB%2BgUfcNf7MnJhTxoStaat6Y96SpDYzBBvY47itvugQDxZBQdyIJLczHaYdQ1wyOzf4NQ%3D%3D; rl_group_id=RudderEncrypt%3AU2FsdGVkX18xbpHtvonGuub4qRzb2K1gWdXyUqahL20%3D; rl_trait=RudderEncrypt%3AU2FsdGVkX180hJwNOLQH9kPJ5%2BUim5c%2BY7Qy1qPBOyw%3D; rl_group_trait=RudderEncrypt%3AU2FsdGVkX1%2FK13%2FlqRi%2BBtAYyUuR0zrHBAdDEPDlXoc%3D; rl_session=RudderEncrypt%3AU2FsdGVkX19gqCjXm9v3ARo3fwim%2FIZo8inWGB4tXZqBecFyQBTDtCgM2VZXxuveUBxNyaX8AMo44q%2Fhi6o%2FN6%2B2GLZsN7ySlsO1DaHBweMYcyutO6u0fn9zgDDywHhqxiAIjfiSUHP0209hi%2BFqHA%3D%3D; experiments-raw=25218711238:25244980973:25309820261:cello_experiment:variation-25458400237:25474380102:25477580049:navigation_revamp:variation-25480640052:25503330074:25439440719:pricing_4_dot_0:variation; OptanonConsent=isGpcEnabled=0&datestamp=Thu+Oct+12+2023+14%3A13%3A54+GMT%2B1100+(Australian+Eastern+Daylight+Time)&version=202307.1.0&browserGpcFlag=0&isIABGlobal=false&hosts=&consentId=86f346d5-6d9a-46bf-a03f-933cb23640de&interactionCount=1&landingPath=NotLandingPage&groups=1%3A1%2C2%3A0%2C3%3A0%2C4%3A0&geolocation=AU%3BVIC&AwaitingReconsent=false; analytics_session_id=1697077815640; analytics_session_id.last_access=1697080464252; AWSALBTG=nOEisfw0IkkODe7bnnNWTMytXwTYkYrN7vt1CUF1QgKkorOFzOGqa+xi/IycFKkPf6f6pFa1/7HyyfI7tC9IJATCnL+/1IjQRRj+g3iGGfcEqgreG7GnRYS3RszjV/XL3sCUji5Tp5+5sNIIMbb9jy7qh/KAKA0cBdyxLfm8xOS6; AWSALBTGCORS=nOEisfw0IkkODe7bnnNWTMytXwTYkYrN7vt1CUF1QgKkorOFzOGqa+xi/IycFKkPf6f6pFa1/7HyyfI7tC9IJATCnL+/1IjQRRj+g3iGGfcEqgreG7GnRYS3RszjV/XL3sCUji5Tp5+5sNIIMbb9jy7qh/KAKA0cBdyxLfm8xOS6",
        "Referer": "https://admin.typeform.com/",
        "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": "{\"api_key\":\"appo6H7gBHY7NC6zm\",\"provider_id\":\"airtable\"}",
    "method": "POST"
    }, (res, err)=>{
        console.log("Here")
        console.log(res);
        if(err){
            console.log(err);
        }
    });
}

init()
    .then((res, err)=>{
        console.log("HERE!!!");
        console.log(res.body);
        if(err){
            console.log(err);
        }
    });
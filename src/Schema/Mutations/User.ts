import { UserType } from "../TypeDefs/User"
import { BankDetails } from "../TypeDefs/Details"
import { GraphQLID, GraphQLList, GraphQLString } from "graphql"
import { Users } from "../../Entities/Users"
import fetch from "node-fetch"
export const CREATE_USER = {
    type: UserType,
    args: {
        // user_id: { type:GraphQLID },
        user_name: { type: GraphQLString },
        bank_accounts: { type: new GraphQLList(GraphQLString)}
    },
    async resolve(parent: any, args: any) {
        const { user_name, bank_accounts } = args;
        await Users.insert({user_name, bank_accounts});
        return args;
    }
}

export const ADD_ACCOUNT_DETAILS = {
    type: BankDetails,
    args: {
        user_id: { type: GraphQLID },
        user_name: { type: GraphQLString },
        bank_accounts: { type: new GraphQLList(GraphQLString) }
    },
    async resolve(parent: any, args: any) {
        const { user_id, user_name, bank_accounts } = args;
        const user = await Users.findOne({where: {user_name: user_name}});
        // console.log("USer", user)
        if (user == null) {
            await Users.insert({user_name, bank_accounts});
        } else {
            const prev = user?.bank_accounts;
            
            let new_one = prev + "," + bank_accounts
            let bank_ifsc_req = new_one.split(",")
            let n_new_one =  [... new Set(bank_ifsc_req)]
            console.log(typeof(new_one), n_new_one)
            await Users.update({user_id: user_id, user_name: user_name}, {bank_accounts: n_new_one})
        }
        async function fun(ifsc_code) {
            return fetch(`https://ifsc.razorpay.com/${ifsc_code}`).then(res => res.json());
        }
        console.log()
        
        
        for (let i = 0; i < bank_accounts.length; i++) {
            let data = await fun(bank_accounts[i]);
            const user_dt = {
                id: user_id,
                name: user_name,
                accounts: bank_accounts
    
            }
            let the_final = Object.assign(user_dt, data)
    
    
            const loca = data.ADDRESS;
            
            var loc = `http://api.positionstack.com/v1/forward?access_key=4a74cb77e725014e1e48c78cd8121a7a&query=${loca}`
            async function coords(loc){
                return fetch(loc).then(res => res.json())
            }
            const lat_lon_data = await coords(loc)
            let lat = lat_lon_data.data[0].latitude;
            let lon = lat_lon_data.data[0].longitude;
            let key = 'c79c730395f9b76324f272a369ecb3ba';
            let lang = 'en';
            let units = 'metric';
            let url = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}&units=${units}&lang=${lang}`;
    
            
        
            async function weather_data(url){
                return fetch(url).then((resp) => resp.json());           
            }
            const wet_data = await weather_data(url);
            const temp = wet_data.hourly[0].temp;
            const humidity = wet_data.hourly[0].humidity;
            const weather_det = {
                temp: temp,
                humidity: humidity
            }
            let the_Final = Object.assign(the_final, weather_det )
    
            console.log("Complete", the_Final)
            return the_Final
        }
        
    }
}




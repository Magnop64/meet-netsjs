const chars = '0123456789abcdefghijklmnopqrstuvwxyz';
const size = 12;

export const GenerateLink = () => {
    let randonString = ''

    for(let i = 0; i < size; i ++){
        if(i === 3 || i === 8){
            randonString += '-';
        }else{
            let randonMath = Math.floor(Math.random() * chars.length);
            randonString += chars.substring(randonMath, randonMath +1);
        }
    }
    return randonString;
}
const moment = {
    MORNING: 'Morning',
    AFTERNOON: 'Afternoon',
    EVENING: 'Evening',
    NIGHT: 'Night'
}

const TimeManager = {
    moment,
    getCurrentMoment(){
        var time = new Date().getHours();

        if (time >= 0 && time < 6 ) {
            return moment.NIGHT;
        }else if (time >= 6 && time < 12 ) {
            return moment.MORNING;
        }else if (time >= 12 && time < 18 ) {
            return moment.AFTERNOON;
        }else{
            return moment.EVENING;
        }
    }
};

export default TimeManager;
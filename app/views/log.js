import clock from 'clock';

export default () => {
    clock.granularity = 'seconds';

    clock.ontick = () => {
        console.log('log');
    }
}
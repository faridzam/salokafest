import defaultEvent from './default_event.jpg';
import EventSmallDay1 from './event_335x200_day_1.png';
import EventSmallDay2 from './event_335x200_day_2.png';
import EventSmallDay3 from './event_335x200_day_3.png';
import EventSmallDay4 from './event_335x200_day_4.png';
import EventMediumDay1 from './event_440x200_day_1.png';
import EventMediumDay2 from './event_440x200_day_2.png';
import EventMediumDay3 from './event_440x200_day_3.png';
import EventMediumDay4 from './event_440x200_day_4.png';

export const mediaEvent = [
    {
        event_id: 1,
        image: EventSmallDay1,
        imageDesktop: EventMediumDay1,
    },
    {
        event_id: 2,
        image: EventSmallDay2,
        imageDesktop: EventMediumDay2,
    },
    {
        event_id: 3,
        image: EventSmallDay3,
        imageDesktop: EventMediumDay3,
    },
    {
        event_id: 4,
        image: EventSmallDay4,
        imageDesktop: EventMediumDay4,
    },
];

export const getImageByID = id => mediaEvent.find(o => o.event_id === id);

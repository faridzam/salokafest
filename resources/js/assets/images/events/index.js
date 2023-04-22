import defaultEvent from './default_event.jpg';

export const mediaEvent = [
    {
        event_id: 1,
        image: defaultEvent,
    },
    {
        event_id: 2,
        image: defaultEvent,
    },
    {
        event_id: 3,
        image: defaultEvent,
    },
    {
        event_id: 4,
        image: defaultEvent,
    },
];

export const getImageByID = id => mediaEvent.find(o => o.event_id === id);

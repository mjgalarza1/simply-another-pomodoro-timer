import DefaultAlarm from "../assets/sfx/alarm-default.mp3"
import ClockRinging from "../assets/sfx/alarm-clock-ringing-fascinatedsound-1-00-03.mp3"
import Bell from "../assets/sfx/bell-congratulations-epic-stock-media-1-00-01.mp3"
import HouseDoorbell from "../assets/sfx/doorbell-ding-dong-low-gfx-sounds-1-00-02.mp3"
import DeskBell from "../assets/sfx/shop-bell-door-opening-jam-fx-1-00-05.mp3"
import Twinkle_1 from "../assets/sfx/glock-new-idea-twinkle-om-fx-1-00-04.mp3"
import Twinkle_2 from "../assets/sfx/chime-fast-twinkle-smartsound-fx-2-2-00-01.mp3"
import DigitalNotification_1 from "../assets/sfx/positive-notification-digital-strum-fast-gamemaster-audio-4-4-00-01.mp3"
import DigitalNotification_2 from "../assets/sfx/ui-positive-selection-ni-sound-1-00-03.mp3"
import DigitalNotification_3 from "../assets/sfx/voicemail-notification-new-message-soundroll-2-2-00-03.mp3"
import DigitalNotification_4 from "../assets/sfx/cartoon-game-upgrade-ni-sound-1-00-03.mp3"

const alarmSounds = {
    defaultAlarm: { name: 'Default alarm', key: 'defaultAlarm', src: DefaultAlarm },
    clockRinging: { name: 'Clock ringing', key: 'clockRinging', src: ClockRinging },
    houseDoorbell: { name: 'Doorbell', key: 'houseDoorbell', src: HouseDoorbell },
    deskBell: { name: 'Desk bell', key: 'deskBell', src: DeskBell },
    bell: { name: 'Chime bell', key: 'bell', src: Bell },
    twinkle1: { name: 'Twinkle chime (A)', key: 'twinkle1', src: Twinkle_1 },
    twinkle2: { name: 'Twinkle chime (B)', key: 'twinkle2', src: Twinkle_2 },
    digitalNotification1: { name: 'Digital notification (A)', key: 'digitalNotification1', src: DigitalNotification_1 },
    digitalNotification2: { name: 'Digital notification (B)', key: 'digitalNotification2', src: DigitalNotification_2 },
    digitalNotification3: { name: 'Digital notification (C)', key: 'digitalNotification3', src: DigitalNotification_3 },
    digitalNotification4: { name: 'Digital notification (D)', key: 'digitalNotification4', src: DigitalNotification_4 }
}

export default alarmSounds;

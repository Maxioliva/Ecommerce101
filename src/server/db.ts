import config from './utils/config';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

initializeApp({
  credential: cert({
    projectId: config.db.projectId,
    clientEmail: config.db.clientEmail,
    privateKey:
      '-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDCVS2f/4qLBpz3\nvXHqoHYVhQYo5PG7+JSj5V3uSUBOlCbNstX+FHUl3086CH2V5O010akspOztsqZx\nQRnf1cKdNpau8TkqSvoo72KwdeljXy6fgxCnkMFf3tJby7UEVzt14lRYYewhdpIZ\n5Bgzqa67pqONycdg8XrUrX3xXacZ1ONGmYG/4U4IX0I97HNf6kt2NVzOKnnoL/Bv\ncE6M/7V3Er0mumerDWFVTN5ImnblOu1UtzDemS5c7Q7uEeAGTS26Gvc+ztRst0IF\npM9mFA02mzTH49OKC7GG8E8o2XdKKfvZQbDZdLs07ZyL5501hifxv35WNGqTHW2l\ndV5NGodbAgMBAAECggEAFd6exdTCSKcJNIV+CRjfG8jen+zemiLSx3xhN8HH74/o\nq1l8Okh0bpCqSoOjbnesN6mipO2NOarTObJJMSbN7Ky0ryINJt9NNnIfjxrrQE2j\n4jujvNfONfXOLUUdgqGL2tZfsO/u3PfftUjgGGBOKRFgcpfJ95+gDR3WgI/jkEUc\nzXzPHMMGIJhPVe8hUmj+chr9Um2+Z+hiPpIRQgeC7l0pr5Gx7cVRSflFZdb1isj6\nk/2u4NrJ/J0BAuYQ5Bz7DR5/FA2w3pIOyM7ZzpMljLKG43btSRTQbBROKxSPHQbL\naw4qUvoChlWkmbuUpthdctS/OTJEXJ8lFRdMuHZDwQKBgQDflqD0/BcDwExXIadV\nWg5SyTbzPoRM1iHkx7w4PVTI8/Bq5/XLkNUqykPcxxG2gItaSZuDtTXaXHOqaP08\n19KuhHiiXoG1ox29RoEbqWmDLyj9rKgWZie5i2rX1BulGy5piA0tomx7mEAMk3Se\n+vPsDILe6ApA3BBpQOm8mK3b8QKBgQDegN71iQ4+xVzmZ41RP4N/9iLsn89t4Ats\n50I+S0plWswlPDiPQUiDZKY4FAunaSguGGeXpVC3pCIwtlrgDqRdBylBU6bNgpLI\ns9YpPVyrCEy4KNigYGv7GTszXc9yd4fJJDwrnOI/F0rEf03RC1pi8A9EHv8jNHb2\nl8+T6+dUCwKBgQDIjnK+jcmPIdTYa2WP2AH1HGxf8Hn3+jPY5Zjd0ZXV04qaOotu\nF/I+OcR5q08mJ1PYnyISGF/ACSHvf9F33BgtVsJm0uMCrNgmSbHRwDrW41yff1of\nDW8grgAerTJG/YS6QMGhZ4prqvv4y+PWH0DhQa+6huV7nGpUH1gKReHd4QKBgQCj\nr+DWd1aAfUdDxUhkTjpaZ+P3efXqmhktq8/C7jaz66Elf3EIinljGCdkN/L+3NCP\nYKrNF/QStW/lsDGYhY0LVxpVkcmzhGyhtBNIUXkb5cYy8PG0wlqN5lj0B/518lN1\neO+/EfIrgeIiPpkrwZNkF8DTV45RAubFsJcn9jM/UwKBgQCHKetOAGTNPCYJ3OnT\nmPNvJbKC0BlvrTJu4erVO3mE2q/3RFgbAUe3e7ew95NaoQj7R907Bp9FJGLwXP/u\nfjN3X0uuWUhh7Ftws8X1WkffRKxywkH28avoEVDmXiUsatAVqfCOhh4FZmjWoQ11\nE+RcomIRSB2BTOIrJwWlFngEgA==\n-----END PRIVATE KEY-----\n',
  }),
});

const db = getFirestore();

export default db;

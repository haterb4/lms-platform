export default {
    port: 8051,
    dbUri: "mongodb://0.0.0.0:27017/?authMechanism=DEFAULT",
    dbName: "learning_db_user",
    user: "manager",
    pass: "rootpwd",
    logLevel: "info",
    saltWorkFactor: 10,
    accessTokenTtl: "7d",
    refreshTokenTtl: "1y",
    accessTokenPublicKey: `LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUFnUHNHdVJvY2dqRWZSMmUwM09QbApFRTNRWDE0dzNkUFQ4UFFxSEZDVWVCTm1TdDV6LytnanlnV1VSZ2lreDRia0tsUnNEUEFjRjlZSG00U2RrMkRhCmlNUXNqcDV1elpaTTNxTWREMkxBd2VrUHlJRTJNQW1mMHlkQVkrS1B3c0VISExZbDhMaEx3NVAzUFl4bDkwd0kKaCt1SFVGU0REeVJackh2NjFTK2ZtV2ljS3dDNEkvaUp3QkYraGU0emVOeTZvekZhTGVIZWhBYTcyb3g5M1crYwptNXhFeFJzU3VMZG5VUUFHc2JDTWNmSXhHSXl1WWtQbzBYLzBRbW9hTWwyTE9OQURpTk8vMmdqY1F0cjZ4YWlvCmE5MXFQa0pNZlIyc0l5TlZsazFXSTV1dG9HZW9ETHVGZ0x6dDVTOTNrR01aNm40RzBIOGxhUmtnTk1ibUtMeUcKb3dJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0t`,
    gmail: {
        user: 'haterb2803@gmail.com',
        pass: 'bvanfmmkljlkpzqb'
    },
}
import cron from 'node-cron';
import log from '../../../config/Logger';

class CronJobScheduler {
    private delayInMilliseconds: number;
    private task: cron.ScheduledTask | null;
    private taskFunction: (() => void) | null;
    private repeat: boolean;

    constructor(delayInMilliseconds: number, repeat: boolean = false) {
        this.delayInMilliseconds = delayInMilliseconds;
        this.task = null;
        this.taskFunction = null;
        this.repeat = repeat;
    }

    public configure(taskFunction: () => void): void {
        this.taskFunction = taskFunction;
    }

    public execute(): void {
        if (this.taskFunction) {
            const cronExpression = this.repeat ? `*/${this.delayInMilliseconds / 1000} * * * * *` : `* * * * *`;
            this.task = cron.schedule(cronExpression, () => {
                this.taskFunction!();
                if (!this.repeat && this.task) {
                    this.task.stop();
                }
            }, {scheduled: this.repeat });
            this.task.start();
        } else {
            throw new Error('Task function not configured.');
        }
    }
}

export default CronJobScheduler


import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatTaskName' })
export class FormatTaskName implements PipeTransform{
    result: string = "";

    transform(name: string): string {
        this.result += name[0].toUpperCase();
        for (let i = 1; i < name.length; i++ ) {
            if (name[i-1] === " ") {
                this.result += name[i].toUpperCase();
            } else this.result += name[i];
        }

        return this.result;
    }
}
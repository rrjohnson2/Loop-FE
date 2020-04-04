import { Pipe, PipeTransform } from '@angular/core';
import { Idea } from 'src/app/models/idea';

@Pipe({
  name: 'ideaFilter'
})
export class IdeaFilterPipe implements PipeTransform {

  transform(ideas: Idea[], filter:string): any {
    if (!ideas || !filter) {
      return ideas;
  }
  return ideas.filter(item=>
    {
      return item.focuses.findIndex(focus => focus.category == filter) != -1;
    });
}
  

}

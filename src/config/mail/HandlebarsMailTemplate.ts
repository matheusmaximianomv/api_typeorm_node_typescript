import handlebars from 'handlebars';
import fs from 'fs';

export interface IParseMailTemplate {
  file: string;
  variables: Record<string, string | number>;
}

export class HandlebarsMailTemplate {
  public async parse(data: IParseMailTemplate): Promise<string> {
    const { file, variables } = data;
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}

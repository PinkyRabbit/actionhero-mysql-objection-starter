import { chatRoom, Action } from 'actionhero';

export class CreateChatRoom extends Action {
  constructor() {
    super();
    this.name = 'createChatRoom';
    this.description = 'I will create a chatroom with the given name';
    this.inputs = {
      name: {
        required: true,
      },
    };
  }

  async run({ params }: { params: { name: string } }) {
    let didCreate = false;

    // eslint-disable-next-line security/detect-non-literal-fs-filename
    if (!(await chatRoom.exists(params.name))) {
      await chatRoom.add(params.name);
      didCreate = true;
    }

    return { name: params.name, didCreate };
  }
}

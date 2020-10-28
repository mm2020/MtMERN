import { Request, Response } from 'express';

import { Member } from '../models';

export const createMember = (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).json({
      success: false,
      messeage: '名前が空白です！',
    });
  }

  const member = new Member(req.body);

  member
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        messeage: '正常に登録しました。',
        id: member._id,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        success: false,
        messeage: '異常が発生しました！',
        error: err,
      });
    });
};

export const readMember = async (req: Request, res: Response) => {
  await Member.find({}, (err, members) => {
    return res.status(200).json({
      success: true,
      messeage: '正常に読み込みました。',
      data: members,
    });
  });
};

export const updateMember = async (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).json({
      success: false,
      messeage: '名前が空白です！',
    });
  }

  Member.findOne({ _id: req.params.id }, (err, member) => {
    if (err || !member) {
      return res.status(404).json({
        success: false,
        message: '異常が発生しました！',
        error: err,
      });
    }
    member.name = req.body.name;
    member
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          message: '正常に上書きしました。',
          id: member._id,
        });
      })
      .catch((err) => {
        return res.status(404).json({
          success: false,
          message: '異常が発生しました！',
          error: err,
        });
      });
  });
};

export const deleteMember = async (req: Request, res: Response) => {
  console.log(req.params.id);
  await Member.findOneAndDelete({ _id: req.params.id }, (err, member) => {
    if (err) {
      console.log(err)
      console.log(member)
      return res.status(400).json({
        success: false,
        messeage: '該当するメンバーがありませんでした！',
        error: err,
      });
    }

    if (!member) {
      console.log(err)
      console.log(member)
      return res.status(404).json({
        success: false,
        messeage: '異常が発生しました！',
        error: err,
      });
    }

    console.log(member)
    return res.status(200).json({
      success: true,
      messeage: '正常に削除しました。',
      data: member,
    });
  }).catch((err) => console.log(err));
};

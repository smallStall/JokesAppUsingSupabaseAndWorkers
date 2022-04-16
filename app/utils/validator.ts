import { Either, left, right, map, mapLeft } from 'fp-ts/Either'
import { getApplicativeValidation } from 'fp-ts/Either';
import { getSemigroup, NonEmptyArray } from 'fp-ts/NonEmptyArray'
import { sequenceT } from 'fp-ts/lib/Apply';
import { pipe } from 'fp-ts/lib/function';

const minLength = (s: string): Either<string, string> =>
  s.length >= 8 ? right(s) : left('8文字以上入力してください')

const oneNumber = (s: string): Either<string, string> =>
  /[0-9]/g.test(s) ? right(s) : left('数字を含めてください')

const oneAlphabet = (s: string): Either<string, string> =>
  /[0-9]/g.test(s) ? right(s) : left('アルファベットを含めてください')

const onlyNumberAlphabet = (s: string): Either<string, string> =>
  /[0-9a-zA-Z]/g.test(s) ? right(s) : left('半角英数字のみ入力してください')


function lift<E, A>(check: (a: A) => Either<E, A>): (a: A) => Either<NonEmptyArray<E>, A> {
  return a =>
    pipe(
      check(a),
      mapLeft(a => [a])
    )
}

function validatePassword(s: string): Either<NonEmptyArray<string>, string> {
  return pipe(
    sequenceT(getApplicativeValidation(getSemigroup<string>()))(
      lift(minLength)(s),
      lift(oneNumber)(s),
      lift(oneAlphabet)(s),
      lift(onlyNumberAlphabet)(s),
    ),
    map(() => s)
  )
}

import * as yup from "yup";

export interface MailLoginForm {
  email: string;
  password: string;
}


yup.setLocale({
  string: {
    min: '${min}文字以上入力してください',
    max: '${max}文字以内で入力してください'
  },
});

export const schema = yup.object<Record<keyof MailLoginForm, yup.AnySchema>>({
  email: yup.string().max(99).required(),
  password: yup.string().min(8).max(99).required()
}).required();


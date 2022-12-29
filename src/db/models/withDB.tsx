/* eslint-disable @typescript-eslint/ban-ts-comment */
import type React from "react";
import type Collection from "@nozbe/watermelondb/Collection";
import type Model from "@nozbe/watermelondb/Model";
import type Query from "@nozbe/watermelondb/Query";
import withObservable from "@nozbe/with-observables";
import type { Observable } from "rxjs";

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

type Observed<A> = A extends Model[]
  ? Query<ArrayElement<A>> | Collection<ArrayElement<A>>
  : A extends Model
  ? A | Observable<A> | any
  : never;
export type ObservedObject<T> = {
  [A in keyof T]: Observed<T[A]>;
};
//@ts-ignore
export type Optional<T, K extends keyof any> = Pick<Partial<T>, K> & Omit<T, K>;

export default function withDB<InputProps, ObservableProps>(
  component: React.ComponentType<InputProps>,
  triggerProps: Array<keyof InputProps>,
  getObservables: (
    props: InputProps
  ) => ObservedObject<ObservableProps> | { [x: string]: any }
): React.FC<Optional<InputProps, keyof ObservableProps>> {
  const A: React.FC<Optional<InputProps, keyof ObservableProps>> =
    withObservable<InputProps, ObservableProps>(
      triggerProps,

      //@ts-ignore
      getObservables
    )(
      //@ts-ignore
      component
    );
  return A;

  // export default function withObservables<InputProps, ObservableProps>(
  //   triggerProps: Array<keyof InputProps>,
  //   getObservables: (props: InputProps) => ObservableProps
  // ): InferableComponentEnhancer<ExtractedObservables<ObservableProps>, InputProps>
}

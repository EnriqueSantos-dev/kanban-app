import { zodResolver } from '@hookform/resolvers/zod';
import {
	ArrayPath,
	FieldArray,
	FieldArrayMethodProps,
	useFieldArray,
	useForm
} from 'react-hook-form';
import { ZodSchema, z } from 'zod';

type UseInteractiveFormProps<TSchema extends ZodSchema> = {
	schema: TSchema;
	defaultValues?: z.infer<TSchema>;
	interactiveFieldName: Extract<
		keyof z.infer<TSchema>,
		{
			[K in keyof z.infer<TSchema>]: z.infer<TSchema>[K] extends unknown[]
				? K
				: never;
		}[keyof z.infer<TSchema>]
	>;
	keyName?: string;
};

export const useInteractiveForm = <TSchema extends ZodSchema>({
	schema,
	defaultValues,
	interactiveFieldName,
	keyName = 'id'
}: UseInteractiveFormProps<TSchema>) => {
	const form = useForm<z.infer<TSchema>>({
		defaultValues,
		resolver: zodResolver(schema)
	});
	const { append, remove, insert, fields, ...restFieldArrayValues } =
		useFieldArray({
			name: interactiveFieldName as ArrayPath<z.infer<TSchema>>,
			control: form.control,
			keyName
		});

	const handleRemoveField = (index: number) => remove(index);
	const handleResetForm = () => form.reset(defaultValues);
	const handleAppendField: (
		data:
			| FieldArray<z.TypeOf<TSchema>, ArrayPath<z.TypeOf<TSchema>>>
			| FieldArray<z.TypeOf<TSchema>, ArrayPath<z.TypeOf<TSchema>>>[],
		options?: FieldArrayMethodProps | undefined
	) => void = (data, options) => {
		append(data, options);
	};

	const handleInsertField: (
		data:
			| FieldArray<z.TypeOf<TSchema>, ArrayPath<z.TypeOf<TSchema>>>
			| FieldArray<z.TypeOf<TSchema>, ArrayPath<z.TypeOf<TSchema>>>[],
		options?: FieldArrayMethodProps | undefined,
		index?: number
	) => void = (data, options, index) => {
		if (index && index > fields.length)
			throw new Error('Out of range in field array');
		insert(fields.length, data, options);
	};

	return {
		handleAppendField,
		handleRemoveField,
		handleResetForm,
		handleInsertField,
		fields,
		...restFieldArrayValues,
		...form
	};
};

import React from 'react';
import Form from '../form';
import styled from 'styled-components';
import { FormBuilderProps, FormField } from "./types";
import { EditorMap } from './editor-map';

const StyledFormBuilder = styled.div`

`;

const FormBuilder: React.FC<FormBuilderProps> = (props) => {

    let { fields, children, onSubmit,className } = props;

    let defaulValues = fields.reduce((p: any, c: FormField) => {
        p[c.name] = c.defaultValue;
        return p;
    }, {});

    const handleSubmit = (values: any) => {
        onSubmit?.call(null, values);
    }

    let submitTriggers = fields.filter(f => f.submitTrigger).map(f => f.name);

    return <StyledFormBuilder className={className}>
        <Form
            defaultValues={defaulValues}
            onSubmit={handleSubmit}
            autoSubmit={submitTriggers?.length > 0 ? true : false}
            watchFor={submitTriggers || []}>
            {
            ({ ...methods }) => (
                <>
                    {fields.map(field => {
                        field.methods = methods;
                        let component = React.createElement(EditorMap[field.type], {...field as unknown as any, key : field.name});
                        return component;
                    })
                    }
                    {
                        children
                    }
                </>
            )
        }
        </Form>
    </StyledFormBuilder >
}

export {
    FormBuilder
};

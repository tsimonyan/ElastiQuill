import React, {Component} from 'react';
import ReactModal from 'react-modal';
import { Button } from 'reactstrap';

import BaseForm from './BaseForm';

const defaultFormValues = {
  allow_comments: true,
  content: '',
  metadata: {}
};

class PostForm extends BaseForm {
  constructor(props) {
    super(props);
    this.state = {
      formValues: _.cloneDeep(props.isNew ? defaultFormValues : props.item)
    };
  }

  _renderModal() {
    return (
      <div className='row'>
        <div className='col-6'>
          {this._renderTextarea({ placeholder: 'Description', maxLength: 300, prop: 'description', optional: true })}
          {this._renderSimpleInput({ className: 'form-control', placeholder: 'Canonical URL', prop: 'metadata.canonical_url', optional: true })}
          {this._renderSimpleInput({ className: 'form-control', placeholder: 'Header image URL', prop: 'metadata.header_image_url', optional: true })}
        </div>
        <div className='col-6'>
          {this._renderTagsInput({ label: 'Tags', prop: 'tags' })}
          {this._renderToggle({ label: 'Allow comments', prop: 'allow_comments' })}
          <div style={{ marginTop: 10 }}>
            <Button
              size='sm'
              color='success'
              onClick={this._submit.bind(this)}
              disabled={this.props.isFormSaving}>
              {this.props.isFormSaving ? 'Saving...' : (this.props.isNew ? 'Publish now' : 'Save changes')}
            </Button>
          </div>
        </div>
        {this._renderErrorMessage()}
      </div>
    )
  }

  _onSubmit() {
    this.props.onSubmit(this.state.formValues);
  }
}

export default PostForm;

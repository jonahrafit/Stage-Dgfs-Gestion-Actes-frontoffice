
import React, { Component } from 'react';

import Autocomplete from 'react-autocomplete';

class AutoCompleteComponent extends Component {
  state = { value: '' };

  getCountry() {
    return [
      { name: 'Afghanistan', code: 'AF' }, { name: 'Åland Islands', code: 'AX' }, { name: 'Albania', code: 'AL' }, { name: 'Algeria', code: 'DZ' }, { name: 'American Samoa', code: 'AS' }, { name: 'AndorrA', code: 'AD' }, { name: 'Angola', code: 'AO' }, { name: 'Anguilla', code: 'AI' }, { name: 'Antarctica', code: 'AQ' }, { name: 'Antigua and Barbuda', code: 'AG' }, { name: 'Argentina', code: 'AR' }, { name: 'Armenia', code: 'AM' }, { name: 'Aruba', code: 'AW' }, { name: 'Australia', code: 'AU' }, { name: 'Austria', code: 'AT' }, { name: 'Azerbaijan', code: 'AZ' }, { name: 'Bahamas', code: 'BS' }, { name: 'Bahrain', code: 'BH' }, { name: 'Bangladesh', code: 'BD' }, { name: 'Barbados', code: 'BB' }, { name: 'Belarus', code: 'BY' }, { name: 'Belgium', code: 'BE' }, { name: 'Belize', code: 'BZ' }, { name: 'Benin', code: 'BJ' }, { name: 'Bermuda', code: 'BM' }, { name: 'Bhutan', code: 'BT' }, { name: 'Bolivia', code: 'BO' }, { name: 'Bosnia and Herzegovina', code: 'BA' }, { name: 'Botswana', code: 'BW' }, { name: 'Bouvet Island', code: 'BV' }, { name: 'Brazil', code: 'BR' }, { name: 'British Indian Ocean Territory', code: 'IO' }, { name: 'Brunei Darussalam', code: 'BN' }, { name: 'Bulgaria', code: 'BG' }, { name: 'Burkina Faso', code: 'BF' }, { name: 'Burundi', code: 'BI' }, { name: 'Cambodia', code: 'KH' }, { name: 'Cameroon', code: 'CM' }, { name: 'Canada', code: 'CA' }, { name: 'Cape Verde', code: 'CV' }, { name: 'Cayman Islands', code: 'KY' }, { name: 'Central African Republic', code: 'CF' }, { name: 'Chad', code: 'TD' }]
  }

  matchCountry(state, value) {
    console.log(state);
    console.log(value);
    return (
      state.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
      state.code.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
  }
  render() {
    return (
      <div className="card col-sm-6" style={{ marginTop: 40, marginLeft: 50 }}>
        <div class="card-header">
          Country Name :
        </div>
        <div class="card-body">
          <form>
            <div className="form-group">

              <Autocomplete
                value={this.state.value}
                inputProps={{ id: 'states-autocomplete' }}
                wrapperStyle={{ position: 'relative', display: 'inline-block' }}
                items={this.getCountry()}
                getItemValue={item => item.name}
                shouldItemRender={this.matchCountry}
                onChange={(event, value) => this.setState({ value })}
                onSelect={value => this.setState({ value })}
                renderMenu={children => (
                  <div className="menu">
                    {children}
                  </div>
                )}
                renderItem={(item, isHighlighted) => (
                  <div
                    className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
                    key={item.abbr} >
                    {item.name}
                  </div>
                )}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AutoCompleteComponent;
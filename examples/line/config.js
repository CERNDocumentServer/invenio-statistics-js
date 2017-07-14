/*
 * This file is part of Invenio.
 * Copyright (C) 2017 CERN.
 *
 * Invenio is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation; either version 2 of the
 * License, or (at your option) any later version.
 *
 * Invenio is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Invenio; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place, Suite 330, Boston, MA 02111-1307, USA.
 *
 * In applying this license, CERN does not
 * waive the privileges and immunities granted to it by virtue of its status
 * as an Intergovernmental Organization or submit itself to any jurisdiction.
 */

// Export configuration object
const config = {
  width: 800,
  height: 450,
  margin: {
    top: 30,
    right: 20,
    bottom: 50,
    left: 50
  },
  graph: {
    type: 'line',
    options: {
      curved: true,
      curveType: 'curveBasis',
      fillArea: true,
      fillAreaColor: '#E8F5E9'
    }
  },
  axis: {
    x: {
      mapTo: 'date',
      scaleType: 'scaleBand',
      options: {
        label: {
          value: 'Date',
          visible: true
        },
        line: {
          visible: false
        },
        ticks: {
          number: 5,
          format: '',
          visible: false
        },
        tickLabels: {
          visible: true,
          rotated: true
        },
        gridlines: true
      }
    },
    y: {
      mapTo: 'value',
      scaleType: 'scaleLinear',
      options: {
        label: {
          value: 'Views',
          visible: true
        },
        line: {
          visible: false
        },
        ticks: {
          number: 5,
          format: '',
          visible: false
        },
        tickLabels: {
          visible: true
        },
        gridlines: true
      }
    }
  },
  title: 'Views',
  color: {
    scale: 'linearGradient',
    thresholds: [
      {
        offset: 0,
        value: '#4CAF50',
        opacity: 0.9
      },
      {
        offset: 100,
        value: '#C8E6C9',
        opacity: 0.9
      }
    ]
  }
};

export default config;

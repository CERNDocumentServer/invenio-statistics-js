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

import './styles.scss';
import config from './config';
import dataCDS from '../data/data';
import { GroupedBarGraph } from '../../src/index';

const data = dataCDS.response3;
const keyType = data[Object.keys(data)[0]].keyType;
const cfg = config[keyType];
const elementClass = 'grouped_country';

// Grouped Bar Chart
const g = new GroupedBarGraph(cfg, data, elementClass);
g.render();
// setTimeout(() => g.update(newData), 3000);
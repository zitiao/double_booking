import { Table, Divider, Tag } from 'antd';
import moment from 'moment';

function AcctDocTable(props) {

    const { data } = props;

    const account_layer1 = [... new Set(data.map(d => d.account_layer1))];
    const account_layer2 = [... new Set(data.map(d => d.account_layer2))];
    const account_layer3 = [... new Set(data.map(d => d.account_layer3))];

    const columns = [
        {
            title: '款项描述',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: '凭证时间',
            dataIndex: 'document_date',
            key: 'document_date',
            render: text => <span>{moment(text).format('YYYY-MM-DD')}</span>
        },
        {
            title: '金额',
            dataIndex: 'amouunt',
            key: 'amouunt',
            render: text => <span>{text.toFixed(2)}</span>,
        },
        {
            title: '流向',
            dataIndex: 'dr_cr_flag',
            key: 'dr_cr_flag',
            filters: [
                { text: '流出', value: 'o' }, { text: '流入', value: 'i' }
            ],
            onFilter: (value, record) => record.dr_cr_flag === value,
            render: text => <Tag>{text === 'o' ? '流出' : '流入'}</Tag>
        },
        {
            title: '账户描述',
            dataIndex: 'account_txt',
            key: 'account_txt',
        },
        {
            title: '账户一级分类',
            dataIndex: 'account_layer1',
            key: 'account_layer1',
            filters: account_layer1.map(a => ({
                text: a,
                value: a
            })),
            onFilter: (value, record) => record.account_layer1 === value,
        },
        {
            title: '账户二级分类',
            dataIndex: 'account_layer2',
            key: 'account_layer2',
            filters: account_layer2.map(a => ({
                text: a,
                value: a
            })),
            onFilter: (value, record) => record.account_layer2 === value,
        },
        {
            title: '账户三级分类',
            dataIndex: 'account_layer3',
            key: 'account_layer3',
            filters: account_layer3.map(a => ({
                text: a,
                value: a
            })),
            onFilter: (value, record) => record.account_layer3 === value,
        },
    ];

    return (
        <Table columns={columns} dataSource={data} />
    )
}

export default AcctDocTable;
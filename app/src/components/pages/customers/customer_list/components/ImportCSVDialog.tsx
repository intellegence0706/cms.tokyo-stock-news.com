import 'react-csv-importer/dist/index.css';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    LinearProgress,
    Typography
} from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Importer, ImporterField } from 'react-csv-importer';
import { postRequest } from '@/utils/axios';
import moment from 'moment';

interface Props {
    open: boolean;
    onClose: () => void;
}

const ImportCSVDialog = ({ open, onClose }: Props) => {
    const [data, setData] = useState<any[]>([]);
    const [result, setResult] = useState<any[]>([]);
    const [doneCnt, setDoneCnt] = useState(0);
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (data.length > 0) handleUpload();
    }, [data]);

    useEffect(() => {
        if (open) {
            setData([]);
            setResult([]);
            setDoneCnt(0);
            setStep(0);
        }
    }, [open]);

    const handleUpload = async () => {
        setResult([]);

        // chunk 100 件ごとにデータを登録する
        let chunkSize = 100;
        let chunk = data.slice(0, chunkSize);
        let rest = data.slice(chunkSize);
        let cnt = 0;
        while (chunk.length > 0) {
            const res = await postRequest('v0/customers/batch_create', {
                data: chunk
            });
            if (res.status == 200) {
                setResult([...result, ...res.data]);

                cnt += chunk.length;
                setDoneCnt(cnt);
                chunk = rest.slice(0, chunkSize);
                rest = rest.slice(chunkSize);
            } else {
                break;
            }
        }

        setStep(2);
    };

    const Step0 = (
        <div>
            <Typography variant='h3' sx={{ fontSize: 14, fontWeight: 500 }}>
                - サンプルデータ
            </Typography>

            <TableContainer>
                <Table stickyHeader aria-label='sticky table'>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ minWidth: 100, whiteSpace: 'nowrap' }}>広告媒体</TableCell>
                            <TableCell style={{ minWidth: 100, whiteSpace: 'nowrap' }}>名前</TableCell>
                            <TableCell style={{ minWidth: 100, whiteSpace: 'nowrap' }}>電話番号</TableCell>
                            <TableCell style={{ minWidth: 100, whiteSpace: 'nowrap' }}>メールアドレス</TableCell>
                            <TableCell style={{ minWidth: 100, whiteSpace: 'nowrap' }}>入金日</TableCell>
                            <TableCell style={{ minWidth: 100, whiteSpace: 'nowrap' }}>契約開始日</TableCell>
                            <TableCell style={{ minWidth: 100, whiteSpace: 'nowrap' }}>契約日数</TableCell>
                            <TableCell style={{ minWidth: 100, whiteSpace: 'nowrap' }}>属性</TableCell>
                            <TableCell style={{ minWidth: 100, whiteSpace: 'nowrap' }}>ステータス</TableCell>
                            <TableCell style={{ minWidth: 100, whiteSpace: 'nowrap' }}>システム提供</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow hover role='checkbox' tabIndex={-1}>
                            <TableCell>Google</TableCell>
                            <TableCell>山田 太郎</TableCell>
                            <TableCell>090-1234-5678</TableCell>
                            <TableCell>yamata.taro@gmail.com</TableCell>
                            <TableCell>2022-12-31</TableCell>
                            <TableCell>2022-01-01</TableCell>
                            <TableCell>365</TableCell>
                            <TableCell>５千万以上</TableCell>
                            <TableCell>勧誘</TableCell>
                            <TableCell>OK</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <Importer
                dataHandler={async rows => {
                    let temp = rows.map((row: any) => ({
                        ...row,
                        deposit_date: row.deposit_date ? moment(row.deposit_date).format('YYYY-MM-DD') : null,
                        contract_start_date: row.contract_start_date
                            ? moment(row.contract_start_date).format('YYYY-MM-DD')
                            : null
                    }));
                    setData(temp);
                    setStep(1);
                }}
                defaultNoHeader={false}
                restartable={false}
            >
                <ImporterField name='ads' label='広告媒体' optional />
                <ImporterField name='name' label='氏名' />
                <ImporterField name='phone' label='電話番号' />
                <ImporterField name='email' label='メールアドレス' />
                <ImporterField name='deposit_date' label='入金日' optional />
                <ImporterField name='contract_start_date' label='契約開始日' optional />
                <ImporterField name='contract_days' label='契約日数' optional />
                <ImporterField name='property' label='属性' optional />
                <ImporterField name='status' label='ステータス' optional />
                <ImporterField name='system_provided' label='システム提供' optional />
            </Importer>
        </div>
    );

    const Step1 = (
        <div className='w-full h-[150px] flex flex-col items-center justify-center'>
            <Typography variant='h3' sx={{ fontSize: 14, fontWeight: 500, mb: 3 }}>
                - データのアップロード中
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                    <LinearProgress variant='determinate' value={data.length > 0 ? (doneCnt * 100) / data.length : 0} />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                    <Typography variant='body2' color='text.secondary'>{`${Math.round(
                        data.length > 0 ? (doneCnt * 100) / data.length : 0
                    )}%`}</Typography>
                </Box>
            </Box>
        </div>
    );

    const Step2 = (
        <div>
            <Typography variant='h3' sx={{ fontSize: 14, fontWeight: 500 }}>
                - 結果
            </Typography>

            <p className='mt-3 px-2'>
                {data.length} 件中 {result.filter(it => it.status == 200).length} 件が登録されました。
            </p>

            <TableContainer>
                <Table stickyHeader aria-label='sticky table'>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ minWidth: 100, whiteSpace: 'nowrap' }}>広告媒体</TableCell>
                            <TableCell style={{ minWidth: 100, whiteSpace: 'nowrap' }}>名前</TableCell>
                            <TableCell style={{ minWidth: 100, whiteSpace: 'nowrap' }}>電話番号</TableCell>
                            <TableCell style={{ minWidth: 100, whiteSpace: 'nowrap' }}>メールアドレス</TableCell>
                            <TableCell style={{ minWidth: 100, whiteSpace: 'nowrap' }}>入金日</TableCell>
                            <TableCell style={{ minWidth: 100, whiteSpace: 'nowrap' }}>契約開始日</TableCell>
                            <TableCell style={{ minWidth: 100, whiteSpace: 'nowrap' }}>契約日数</TableCell>
                            <TableCell style={{ minWidth: 100, whiteSpace: 'nowrap' }}>属性</TableCell>
                            <TableCell style={{ minWidth: 100, whiteSpace: 'nowrap' }}>ステータス</TableCell>
                            <TableCell style={{ minWidth: 100, whiteSpace: 'nowrap' }}>システム提供</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {result.map((row, index) => {
                            if (row.status == 200) {
                                return (
                                    <TableRow
                                        hover
                                        role='checkbox'
                                        tabIndex={-1}
                                        key={index}
                                        sx={{
                                            backgroundColor: '#ccffcc'
                                        }}
                                    >
                                        <TableCell>{row.data.ads}</TableCell>
                                        <TableCell>{row.data.name}</TableCell>
                                        <TableCell>{row.data.phone}</TableCell>
                                        <TableCell>{row.data.email}</TableCell>
                                        <TableCell>
                                            {row.data?.deposit_date
                                                ? moment(row.data?.deposit_date).format('YYYY/MM/DD')
                                                : ''}
                                        </TableCell>
                                        <TableCell>
                                            {row.data?.contract_start_date
                                                ? moment(row.data?.contract_start_date).format('YYYY/MM/DD')
                                                : ''}
                                        </TableCell>
                                        <TableCell>{row.data.contract_days} 日</TableCell>
                                        <TableCell>{row.data.property?.name}</TableCell>
                                        <TableCell>{row.data.status?.name}</TableCell>
                                        <TableCell>{row.data.system_provided ? 'OK' : 'NG'}</TableCell>
                                    </TableRow>
                                );
                            }

                            return (
                                <TableRow
                                    hover
                                    role='checkbox'
                                    tabIndex={-1}
                                    key={index}
                                    sx={{
                                        backgroundColor: '#ffcccc'
                                    }}
                                >
                                    <TableCell>{row.data.ads}</TableCell>
                                    <TableCell>{row.data.name}</TableCell>
                                    <TableCell>{row.data.phone}</TableCell>
                                    <TableCell>{row.data.email}</TableCell>
                                    <TableCell>
                                        {row.data?.deposit_date
                                            ? moment(row.data?.deposit_date).format('YYYY/MM/DD')
                                            : ''}
                                    </TableCell>
                                    <TableCell>
                                        {row.data?.contract_start_date
                                            ? moment(row.data?.contract_start_date).format('YYYY/MM/DD')
                                            : ''}
                                    </TableCell>
                                    <TableCell>{row.data.contract_days} 日</TableCell>
                                    <TableCell>{row.data.property}</TableCell>
                                    <TableCell>{row.data.status}</TableCell>
                                    <TableCell>{row.data.system_provided ? 'OK' : 'NG'}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='xl'>
            <DialogTitle sx={{ fontSize: 16, fontWeight: 700 }}>csv一括登録する</DialogTitle>
            <DialogContent>
                {step == 0 && Step0}
                {step == 1 && Step1}
                {step == 2 && Step2}
            </DialogContent>
            <DialogActions>
                <Button autoFocus color='secondary' onClick={onClose}>
                    閉じる
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ImportCSVDialog;

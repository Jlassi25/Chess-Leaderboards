import { Input, Flex, Button, Wrap } from '@chakra-ui/react';
import {
    useDisclosure,

} from '@chakra-ui/react'
import { useRef } from 'react';
import ModalModifyPlayer from './ModalModifyPlayer';


const Item = ({ players, setPlayers, currentItem, setCurrentItem, item }) => {


    //Chakra Modal Settings : Modify Player Modal
    const { isOpen: isOpenModal1, onOpen: onOpenModal1, onClose: onCloseModal1 } = useDisclosure();
    const initialRef = useRef(null)


    //OnClick Modify Player Button 
    const onOpenModal1WithObject = (object) => {
        setCurrentItem(object);
        onOpenModal1();
    }


    return (
        <>
            <tr>
                <td className="text-center"><img src={item.avatar} alt="" width={"50px"} className="img-fluid" /></td>
                <td className="text-center">{item.username}</td>
                <td className="text-center">{item.score}</td>
                <td className="text-center">{item.rank}</td>
                <td className="text-center">{item.win_count}</td>
                <td className="text-center">{item.loss_count}</td>
                <td className="text-center">{item.draw_count}</td>
                <td className="text-center">{item.title}</td>
                <td className="text-center">{item.status}</td>
                {/* Modify Player Buton */}
                <td className="text-center"><Button onClick={() => onOpenModal1WithObject(item)} id="btn-add-contact" className="btn btn-primary" style={{ marginRight: '10px' }}>
                    <i className="ti ti-users text-black me-1 fs-5" /> Modifiy Player
                </Button>

                    {/* Delete Player Button */}
                    <button type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#al-warning-alert" className="btn btn-danger" onClick={() => setCurrentItem(item)}>
                        Delete
                    </button>
                </td>

            </tr >



            {/* Modal Modify Player */}
            <ModalModifyPlayer
                players={players}
                setCurrentItem={setCurrentItem}
                setPlayers={setPlayers}
                currentItem={currentItem}
                initialRef={initialRef}
                isOpenModal1={isOpenModal1}
                onOpenModal1={onOpenModal1}
                onCloseModal1={onCloseModal1}>

            </ModalModifyPlayer>

        </>
    );
};
export default Item;
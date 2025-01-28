import { useState } from 'react';
import s from './TableMyPacks.module.css';
import { formatPrice } from '../../../utils/utils';
import EditPack from './EditPack';
import CreatePack from './CreatePack';

const TableMyPacks = ({ myPacks }) => {
  const [selectedPack, setSelectedPack] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const openEditModal = (pack) => {
    setSelectedPack(pack);
    setEditModalOpen(true);
  }

  const openCreateModal = () => {
    setCreateModalOpen(true);
  }

  const closeModal = () => {
    setEditModalOpen(false);
    setCreateModalOpen(false);
    setSelectedPack(null);
  }

  return (
    <div className={s.container}>
      <h2>Mis packs</h2>
      <div className={s.divData}>
        {/* search */}
        <div className={s.navPack}>
          <button className={s.btnCreate} onClick={openCreateModal}>Crear pack</button>
        </div>
        <div className={s.divPacks}>
          <table className={s.table}>
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Unidades</th>
                <th>ARS</th>
                <th>USD</th>
                <th className={s.thActions}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                myPacks.map(pack => (
                  <tr key={pack.id}>
                    <td><img src={pack.mainImage} alt={pack.name} /></td>
                    <td>{pack.name}</td>
                    <td>{formatPrice(pack.price)}</td>
                    <td>{pack.priceDolar}</td>
                    <td className={s.tdActions}>
                      <button className={s.btnEdit} onClick={() => openModal(pack)}>Editar</button>
                      <button className={s.btnDelete}>Eliminar</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
      {editModalOpen && <EditPack pack={selectedPack} closeModal={closeModal} />}
      {createModalOpen && <CreatePack closeModal={closeModal} />}
    </div>
  );
};


export default TableMyPacks;
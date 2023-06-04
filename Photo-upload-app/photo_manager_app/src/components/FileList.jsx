import styles from './FileList.module.css';

export default function FileList({ photos, renamePhotoHandler }){

	return (
		<div className={styles.list}>
			{photos.map((photo, index) => {
				return (
					<div className={styles.imageElement} key={index}>
						<div className={styles.elementHeader}>
							<input id={"cb" + index} type="checkbox" className={styles.checkbox}/>
							<label htmlFor={"cb" + index}>
								<h3 className={styles.photoTitle}>{photo}</h3>
							</label>
						</div>
						<img className={styles.image} src={`./img/${photo}`} alt="A photo from the server"/>
						<button className={styles.imageElementButton}
								onClick={() => renamePhotoHandler(photo)}>
							Rename
						</button>
						<button className={styles.imageElementButton}>Delete</button>
					</div>
				);
			})}
		</div>
	);
}
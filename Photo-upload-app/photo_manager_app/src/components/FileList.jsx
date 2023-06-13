import styles from './FileList.module.css';

export default function FileList({photos, selectedNames, onToggleSelectPhoto, onRenamePhoto, onDeletePhoto}) {

	return (
		<div className={styles.list}>
			{photos.map((photo, index) => {
				return (
					<div className={styles.imageElement} key={index}>
						<div className={styles.elementHeader}>
							<input id={"cb" + index}
								   type="checkbox"
								   className={styles.checkbox}
								   checked={selectedNames.includes(photo)}
								   onChange={() => onToggleSelectPhoto(photo)}
							/>
							<label htmlFor={"cb" + index}>
								<h3 className={styles.photoTitle}>{photo}</h3>
							</label>
						</div>
						<img className={styles.image} src={`./img/${photo}`} alt="A photo from the server"/>
						<div className={styles.buttonsWrapper}>
							<button className={styles.imageElementButton}
									onClick={() => onRenamePhoto(photo)}
							>
								Rename
							</button>
							<button className={styles.imageElementButton}
									onClick={() => onDeletePhoto([photo])}
							>
								Delete
							</button>
						</div>

					</div>
				);
			})}
		</div>
	);
}